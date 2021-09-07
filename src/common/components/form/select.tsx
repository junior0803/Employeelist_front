import * as React from "react";
import { MemberEntity } from '../../../model';

interface Props {
    member: MemberEntity;
    name: string;
    label: string;
    value: string;
    onChange: (fieldName: string, value: string) => void;
    options: readonly string[];
    error?: string;
}


export const Select: React.StatelessComponent<Props> = (props) => {
    return (
        <div className={formatWrapperClass(props)}>
            <label htmlFor={props.name}>{props.label}</label>
            <div className="field">
                <select
                    value={props.value}
                    name={props.name}
                    className="form-control"
                    onChange={onChangeSelect(props)}
                >
                    {props.options.map((value) => (
                        <option value={value} key={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
            <div className="help-block">{props.error}</div>
        </div>
    )
};

const formatWrapperClass = (props: Props) => {
    const wrapperClass = 'form-group';

    return props.error ?
        `${wrapperClass} has-error` :
        wrapperClass;
};

const onChangeSelect= (props: Props) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.target.name, e.target.value);
};
