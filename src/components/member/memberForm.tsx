import * as React from 'react';
import { MemberEntity } from '../../model';
import { Input, Button, Select } from '../../common/components/form';
import {memberAPI} from "../../api/member";
import {loaddash} from 'lodash';
import {useState} from "react";

interface Props {
    member: MemberEntity;
    onChange: (fieldName: string, value: string) => void;
    onSave: () => void;
}

export const MemberForm: React.StatelessComponent<Props> = (props) => {
    const [timezone, setTime] = useState( ['', '']);
    const [lang, setLang] = useState( ['', '']);
    const [curr, setCurr] = useState( ['', '']);
    const [data, setData] = useState( {countries:[{country:'', language: '', currency: '', timezone:''}]});
    React.useEffect(() => {
        const outputArray = [];
        //const otherData = [];
        fetch('https://restcountries.eu/rest/v2/all').then(res => {
            return res.json()
        }).then(json => {
            //console.log(json)
            for (let element in json) {
                //outputArray.push(json[element]['name']);
                outputArray.push({
                     country:  json[element]['name'],
                     language: json[element]['languages'],
                     currency: json[element]['currencies'],
                     timezone: json[element]['timezones']
                 })
            }
            setData({countries: outputArray})
            // setTime({timezone:[]})
            // setLang({lang: []})
            // setCurr({curr: []})
            //setOtherData({countrisdata: outputArray})

        })
    })
    const onChangeSelect= (props: Props) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        data.countries.map((values) => {
            const temp_array = [];
            const temp_array1 = [];
            const temp_array2 = [];
            if(values.country == e.target.value){
                props.member.country=e.target.value
                for (var temp = 0; temp<values['language'].length;temp++) {
                    temp_array.push(values['language'][temp]['name'])
                }
                setLang(temp_array)
                for (var temp = 0; temp<values['currency'].length;temp++) {
                    temp_array1.push(values['currency'][temp]['name'])
                }
                setCurr(temp_array1)
                for (var temp = 0; temp<values['timezone'].length;temp++) {
                    temp_array2.push(values['timezone'][temp])
                }
                setTime(temp_array2)
            }
        })
    }

    return (
        <form>
            <h1>Manage Employee</h1>
            <div style={{width:'500px',alignContent:'center'}} >
                <Input
                    name="name"
                    label="Full Name"
                    value={props.member.name}
                    onChange={props.onChange}
                />
                {/*<Select*/}
                {/*    member={props.member}*/}
                {/*    name="country"*/}
                {/*    label="Country"*/}
                {/*    options={data.countries.map((values)=>{return values.country})}*/}
                {/*    value={props.member.country}*/}
                {/*    onChange={onChangeSelect(props)}*/}
                {/*/>*/}
                <label htmlFor={"country"}>{"Country"}</label>
                <div className="field">
                    <select
                        name={"country"}
                        className="form-control"
                        onChange={onChangeSelect(props)}
                    >
                    {data.countries.map((value) => (
                        <option value={value.country} key={value.country}>
                            {value.country}
                        </option>
                    ))}
                    </select>
                </div>
                <Select
                    member={props.member}
                    name="language"
                    label="Language"
                    options={lang}
                    value={props.member.language}
                    onChange={props.onChange}
                />
                <Select
                    member={props.member}
                    name="currency"
                    label="currency"
                    options={curr}
                    value={props.member.currency}
                    onChange={props.onChange}
                />
                <Select
                    member={props.member}
                    name="timezone"
                    label="Timezone"
                    options={timezone}
                    value={props.member.timezone}
                    onChange={props.onChange}
                />
                {/*<Input*/}
                {/*    name="timezone"*/}
                {/*    label="Timezone"*/}
                {/*    value={props.member.timezone}*/}
                {/*    onChange={props.onChange}*/}
                {/*/>*/}
            </div>
            <Button
                label="Save"
                className="btn btn-default"
                onClick={props.onSave}
            />
        </form>
    );
};
