/*
 * @Version: 1.0
 * @Author: ZPK
 * @Date: 2023-01-11 10:06:49
 * @LastEditors: ZPK
 * @LastEditTime: 2023-01-11 10:07:45
 */
declare module "*.vue"{
    import type {DefineComponent} from "vue"
    const component:DefineComponent<{},{},any>
    export default component
}