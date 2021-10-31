/*export function getAll(){
    return fetch("https://jsonfy.com/items")
            .then(res=>res.json())
}

export function getById(id){
    return fetch("https://jsonfy.com/items/"+id)
    .then(res=>res.json())
}*/
import instance from '../Config/axios';

export function getAll(){
    return instance.get("items")

}

export function getById(id){
    return instance.get("items/"+id)
}