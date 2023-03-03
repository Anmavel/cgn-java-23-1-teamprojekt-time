import moment from "moment";
import DayGallery from "./DayGallery";
import {useNavigate, useParams} from "react-router-dom";
import './WeekGallery.css';

export default function WeekGallery(){

    const params=useParams()
    const year = params.year
    const week = params.week
    const date = moment().isoWeekYear(parseInt(year|| "2023")).isoWeek(parseInt(week || "1")).isoWeekday(1);

    const daysGallery=[]
    const navigate = useNavigate()

    for(let i=0;i<7;i++){
        daysGallery.push(<DayGallery key={i} year={date.year().toString()} month={(date.month()+1).toString()} day={date.date().toString()}/>)
        date.add(1, 'd')
    }

    date.subtract(7,"d")

    function handleLeftButton(){
        date.subtract(1,"w")
        navigate(`/tasks/${date.isoWeekYear()}/week/${date.isoWeek()}`)
    }

    function handleRightButton(){
        date.add(1,"w")
        navigate(`/tasks/${date.isoWeekYear()}/week/${date.isoWeek()}`)
    }

    return (
        <>
            <h2> Week {year}/{week}</h2>
            <button onClick={handleLeftButton}>◀️</button>
            <button onClick={handleRightButton}>▶️</button>
            <section className={"weekGallery"}>
                {daysGallery}
            </section>
        </>
    )

}