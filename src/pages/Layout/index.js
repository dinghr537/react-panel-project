import { http } from "@/utils";
import { useEffect } from "react";

function Layout() {
    useEffect(()=>{
      http.get('/user/profile')
    }, [])


    return (
      <>
        <div className="Layout">
          Layout
        </div>

      </>
    );
  }
  
export default Layout;
  