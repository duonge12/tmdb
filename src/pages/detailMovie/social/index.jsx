import { Tab, TabList, TabPanel, Tabs } from "react-tabs"

export const Social=({movieId})=>{
    
    return(
        <Tabs>
            <TabList className="flex">
                <Tab>Review</Tab>
                <Tab>Discussion</Tab>
            </TabList>
            <TabPanel>Content 1</TabPanel>
            <TabPanel>Content 2</TabPanel>
        </Tabs>
    )
}