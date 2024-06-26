import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useChannel } from '@/hooks/useChannel'
import { useEffect, useMemo } from 'react'
import { getArticleListAPI, deleteArticleAPI } from '@/apis/article'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const { Option } = Select
const { RangePicker } = DatePicker


const Article = () => {
	const navigate = useNavigate()
	const status = {
		1: <Tag color="warning">待审核</Tag>,
		2: <Tag color="success">审核通过</Tag>
	}
	// 准备列数据
	const columns = [
	{
		title: '封面',
		dataIndex: 'cover',
		width: 120,
		render: cover => {
		return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
		}
	},
	{
		title: '标题',
		dataIndex: 'title',
		width: 220
	},
	{
		title: '状态',
		dataIndex: 'status',
		render: data => status[data]
	},
	{
		title: '发布时间',
		dataIndex: 'pubdate'
	},
	{
		title: '阅读数',
		dataIndex: 'read_count'
	},
	{
		title: '评论数',
		dataIndex: 'comment_count'
	},
	{
		title: '点赞数',
		dataIndex: 'like_count'
	},
	{
		title: '操作',
		render: data => {
		return (
			<Space size="middle">
				<Button type="primary" shape="circle" onClick={()=>navigate(`/publish?id=${data.id}`)} icon={<EditOutlined />} />
				<Popconfirm title="确定删除吗？" okText="确定" cancelText="取消" onConfirm={()=>onDelete(data)}>
					<Button
						type="primary"
						danger
						shape="circle"
						icon={<DeleteOutlined />}
					/>
				</Popconfirm>
				
			</Space>
		)
		}
	}
	]
	// 准备表格body数据
	const data = [
	{
		id: '8218',
		comment_count: 0,
		cover: {
		images: [],
		},
		like_count: 0,
		pubdate: '2019-03-11 09:00:00',
		read_count: 2,
		status: 2,
		title: 'wkwebview离线化加载h5资源解决方案'
	}
	]

	const [reqData, setReqData] = useState({
		status: '',
		channel_id: '',
		begin_pubdate: '',
		end_pubdate: '',
		page: 1,
		per_page: 4
	
	})

	const [articleList, setArticleList] = useState([])
	const [articleCount, setArticleCount] = useState(0)
	useEffect(()=>{
		const getArticleList = async () => {
			const res = await getArticleListAPI(reqData)
			setArticleList(res.data.results)
			setArticleCount(res.data.total_count)
			console.log(res)
		}
		getArticleList()
	}, [reqData])
	const { channelList } = useChannel()
	// const currentArticles = useMemo(()=>{
	// 	const num = articleList.length
	// 	return {num}
	// }, [articleList])
	const onPageChange = (page) => {
		setReqData({
			...reqData,
			page
		})
	}
	const handleFilter = (values) => {
		setReqData({
			...reqData,
			status: values.status,
			channel_id: values.channel_id,
			begin_pubdate: values.date[0].format('YYYY-MM-DD'),
			end_pubdate: values.date[1].format('YYYY-MM-DD')
		})
	
	}

	const onDelete = async (data) => {
		console.log('delete', data)
		await deleteArticleAPI(data.id)
		setReqData({
			...reqData
		})
	}

	return (
		<div>
			<Card
			title={
				<Breadcrumb items={[
				{ title: <Link to={'/'}>首页</Link> },
				{ title: '文章列表' },
				]} />
			}
			style={{ marginBottom: 20 }}
			>
			<Form initialValues={{ status: '' }} onFinish={handleFilter}>
				<Form.Item label="状态" name="status">
				<Radio.Group>
					<Radio value={''}>全部</Radio>
					<Radio value={0}>草稿</Radio>
					<Radio value={2}>审核通过</Radio>
				</Radio.Group>
				</Form.Item>

				<Form.Item label="频道" name="channel_id">
				<Select
					placeholder="请选择文章频道"
					defaultValue=""
					style={{ width: 120 }}
				>
					{channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
				</Select>
				</Form.Item>

				<Form.Item label="日期" name="date">
				{/* 传入locale属性 控制中文显示*/}
				<RangePicker locale={locale}></RangePicker>
				</Form.Item>

				<Form.Item>
				<Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
					筛选
				</Button>
				</Form.Item>
			</Form>
			</Card>
			{/* <Card title={`根据筛选条件共查询到 ${currentArticles.num} 条结果：`}> */}
			<Card title={`根据筛选条件共查询到 ${articleCount} 条结果：`}>
				<Table rowKey="id" columns={columns} dataSource={articleList} pagination={
					{
						total: articleCount,
						pageSize: reqData.per_page,
						onChange: onPageChange
					}
				}/>
			</Card>
		</div>
	)
}

export default Article