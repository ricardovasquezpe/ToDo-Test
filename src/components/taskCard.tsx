import moment from 'moment'

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
                <div className="flex space-x-1 items-start content-start">
                    <div>
                        <input type="checkbox" id={props.id} disabled={(date.isBefore(today) ? true : false)} onChange={checked} checked={props.checked}/>
                        <label htmlFor={props.id}></label>
                    </div>
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