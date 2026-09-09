import { AppstoreAddOutlined } from "@ant-design/icons";

function LeftPanel(){
    const tabsItems=[
        {
            key:"componentLib",
            label:(
                <span>
                    <AppstoreAddOutlined/>
                    组件库
                </span>
            ),
            children:<ComponentLib/>
        }
    ]
}