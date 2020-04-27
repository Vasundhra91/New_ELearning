import React from 'react'
import Link from '@material-ui/core/Link';
//import Maapform from './RangeCircleform'
export default function Home() {
    
    return (
        <div>
            <div className="row" style={{ background: "blue", width: "100%" }}>
                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 " style={{ paddingLeft: "70px"}} >
                    <h2>E-Learning</h2>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                <Link href="/admin/SignupPage/" variant="body2" style={{ color: "red",fontSize:"20px"}}>
                {"SignIn"}
              </Link>
            </div>
            </div>
          

        </div>
    )
}
