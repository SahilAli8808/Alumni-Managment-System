import store from '../../../Redux/store/storage'
var buildUrl = require('build-url');
let cities = require ('countries-cities');

export default function CollegeOptions(colleges){
    let selection = [];
    colleges.forEach((value) => {
        let obj = { value: `${value._id}`, label: `${value.collegeName}` }
        selection.push(obj);
    })
    return selection;
};

export function YearOptions(){
    let selection = [];
    let StartYear = 2010;
    for(let i = 0 ; i < 30 ; i++){
        let obj = { value: parseInt(`${StartYear+i}`), label: parseInt(`${StartYear+i}`) }
        selection.push(obj);
    }
    return selection;
}

export function BranchOption(){
    let branch = ['cse', 'mech', 'civil'];
    let selection = [];
    branch.forEach((value) => {
        let obj = { value : `${value}`, label:`${value}`}
        selection.push(obj);
    })
    return selection;
}

export function selector(countries){
    let selection = [];
    countries.forEach((value) => {
        let obj = { value: `${value}`, label: `${value}` }
        selection.push(obj);
    })
    return selection;
};

export function cityList(country){
    let selection = [];
    let cityList = cities.getCities(country);
    cityList.forEach((value) => {
        let obj = { value: `${value}`, label: `${value}` }
        selection.push(obj);
    })
    return selection;
}

export function intoUrl(states){
    let state = store.getState();
    let user = state.Auth_user;
    let {college, year, branch } = states;
    let years = [];
    let colleges = [];
    let branches = [];
    if(year){
    year.forEach((data) => {
        let array = data.value
        years.push(array)
    })}
    if(college){
    college.forEach((data) => {
            let array = data.value
            colleges.push(array)
    })}
    if(branch){
    branch.forEach((data) => {
            let array = data.value
            branches.push(array)
    })}
    let url = buildUrl('http://localhost:4000',{
        path : `${user}/email`,   // no college
        disableCSV: true,
        queryParams : {
           collegeId : colleges,
           branch : branches,
           endYear : years
        }
    })
    return decodeURI(url);
}
