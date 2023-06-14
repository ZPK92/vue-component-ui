/*
 * @Version: 1.0
 * @Author: ZPK
 * @Date: 2023-01-11 14:50:47
 * @LastEditors: ZPK
 * @LastEditTime: 2023-01-11 15:02:39
 */
import {Plugin}from 'vue'
// 增加install方法
export type SFCWithInstall<T> = T & Plugin
export function withInstall<T>(comp:T){
    (comp as SFCWithInstall<T> ).install = function(app){
        // 学习这个as断言的使用
        let {name}=comp as unknown as {name:string}
        app.component(name,comp as any)
    }
    return comp as SFCWithInstall<T>
} 