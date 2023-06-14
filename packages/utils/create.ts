// 用来创建bem规范的名字
// b block代码块 e element元素 m modifier装饰 state 状态
// z-button__box--
// is-checked 
// :class=[bem.b['button']]
function _bem(prefixName: string,blockName: string,elementName: string,modifierName: string){
    if(blockName){
        prefixName += `-${blockName}`
    }
    if(elementName){
        prefixName += `__${elementName}`
    }
    if(modifierName){
        prefixName += `--${modifierName}`
    }
    return prefixName
}

function createBEM(prefixName:string){
    const b = (blockName="")=>_bem(prefixName,blockName,"","")
    const e = (elementName="")=>elementName ? _bem(prefixName,"",elementName,"") : ""
    const m = (modifierName="")=>modifierName ? _bem(prefixName,"","",modifierName) : ""
    // be em bm bem
    const be = (blockName="",elementName="")=>blockName&&elementName ? _bem(prefixName,blockName,elementName,"") : ""
    const em = (elementName="",modifierName="")=>modifierName&&elementName ? _bem(prefixName,"",elementName,modifierName) : ""
    const bm = (blockName="",modifierName="")=>modifierName&&blockName ? _bem(prefixName,blockName,"",modifierName) : ""
    const bem = (blockName="",elementName="",modifierName="")=>elementName&&modifierName&&blockName ? _bem(prefixName,blockName,elementName,modifierName) : ""
    const is = (name: string,state: string | boolean)=>(state ? `is-${name}` : "")
    return {
        b,
        e,
        m,
        be,
        em,
        bm,
        bem,
        is
    }
}
export function createNamespace(name:string){
    const prefixName = `z-${name}`
    return createBEM(prefixName)
}
/* 
// 测试
let bem = createNamespace("xxx")
bem.b("button") //z-button 
console.log(bem.e("inner"));
 //z-button__inner */