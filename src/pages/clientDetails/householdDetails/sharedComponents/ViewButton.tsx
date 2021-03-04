import React from "react";
import {EyeFilled,} from "@ant-design/icons";


const ViewButton = (props: any) => {
    return <a href="#!" onClick={() => props.onClick()}><EyeFilled/></a>
}

export default ViewButton