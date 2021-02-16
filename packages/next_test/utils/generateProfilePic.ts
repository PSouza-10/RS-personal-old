import {colorFromString} from './colorFromString'

export function generateProfilePic(name,_id){
    return `https://ui-avatars.com/api/?background=${colorFromString(_id)}&name=${name.replace(' ','+')}&rounded=true`
} 