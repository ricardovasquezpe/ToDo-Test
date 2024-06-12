import moment from 'moment/min/moment-with-locales';

export const TaskCard = (props: Props) => {
    var date = moment(props.date);
    var today = moment();
    const formattedTime = date.format("MMM DD, YYYY");

    const checked = () =>{
        props.onChecked(props.id);
    }

    return(
        <div className="grid grid-cols-12 grid-rows-1 gap-3">
            <div className="col-span-10">
                <div className="flex space-x-3 items-center">
                    <input className="border-gray-300 rounded w-4 h-4" type="checkbox" disabled={(date.isBefore(today) ? true : false)} onChange={checked} defaultChecked={props.checked}/>
                    <div className="grid grid-rows-2">
                        <p className='text-slate-600 font-semibold text-md'>{props.name}</p>
                        <p className='text-slate-600 text-md'>{props.description}</p>
                    </div>
                </div>
            </div>
            <div className="col-span-2">
                <p className={(date.isBefore(today) ? "text-red-500" : "text-slate-600 ")}>{formattedTime}</p>
            </div>
        </div>
    );
}

type Props = {
    id: string,
    name: string,
    date: number,
    description: string,
    checked: boolean,
    onChecked: (id: string) => void
};