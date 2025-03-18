import { Tab, TabList, Tabs } from "react-tabs"

export const Social=()=>{
    return(
        <Tabs>
            <TabList>
                <Tab>Tab 1</Tab>
                <Tab>Tab 2</Tab>
            </TabList>
            <TabPanel>Content 1</TabPanel>
            <TabPanel>Content 2</TabPanel>
        </Tabs>
    )
}