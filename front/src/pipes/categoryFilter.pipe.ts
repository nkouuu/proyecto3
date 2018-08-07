import {Directive, Component,  Pipe, PipeTransform} from '@angular/core';
 
@Pipe({
    name: 'categoryFilter'
})
export class CategoryPipe implements PipeTransform
{
    transform(arr: Array<any>,field:string,value:string ): any
    {
        if(field=="category"){
            if(value=="All") return arr
            const arr2=arr.filter(e=>
                e.category==value
            )
            return arr2
        }else{
            return arr.filter(e=>{
                return e[field]==value
            })
        }
        
    }
}