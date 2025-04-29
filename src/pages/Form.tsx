import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { useState, type ChangeEvent } from "react";

export default function Form() {

    const [activitiesTitle, setActivitiesTitle] = useState(["Title 1"]);
    const [activitiesDetail, setActivitiesDetail] = useState(["Detail 1"]);
    const [activeIndex, setActiveIndex] = useState(0);

    
    const handle_add_activity = () => {
        setActivitiesTitle([...activitiesTitle, "Title "+(activitiesTitle.length+1)]);
        setActivitiesDetail([...activitiesDetail, "Detail "+(activitiesDetail.length+1)]);
        setActiveIndex(activitiesDetail.length);
    }

    const handle_detail_change = (e: ChangeEvent<HTMLTextAreaElement>, index: number) => {
        setActivitiesDetail(activitiesDetail.map((detail, i) => index == i ? e.target.value : detail));
    }

    const handle_submit = async () => {
        const result = await fetch("http://127.0.0.1:3000/api/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "d1c0u93ynvr90hiahdw"
            },
            body: JSON.stringify({
                "activities_title": activitiesTitle,
                "activities_detail": activitiesDetail
            })
        });

        if(!result.ok) {
            alert(`There's something wrong. Status Code: ${result.status}`)
        }

        alert("Success");
    }
    
    return (
        <div className="grid grid-rows-[1fr_auto] gap-4 p-5 h-[90dvh] w-[90dvw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden border-1 rounded-2xl">
            <div className="bg-(--primary-color) w-full h-full absolute opacity-25 left-0 top-0 -z-10"></div>
            <Splitter className="flex gap-2 z-12 overflow-y-auto" layout="horizontal">
                <SplitterPanel className="p-5 grid auto-rows-max! grid-flow-row! gap-2 overflow-y-auto" style={{ display: "grid" }}>
                    {activitiesTitle.map((value, index) => <InputText key={index} defaultValue={value} onFocus={() => { setActiveIndex(index)}} />)}
                    <Button label="Add Activity" onClick={handle_add_activity} />
                </SplitterPanel>
                <SplitterPanel className="p-5">
                    {activitiesDetail.map((value, index) => (activeIndex == index ? <InputTextarea key={index} defaultValue={value} className="h-full w-full" autoResize onChange={(e) => handle_detail_change(e, index)} /> : ""))}
                </SplitterPanel>
            </Splitter>
            <Button label="Submit for today!" onClick={handle_submit} />
        </div>
    );
}