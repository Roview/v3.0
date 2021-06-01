<template>
    <div>
        <!--        <form style="text-align: center">-->
        <!--            <input type="text" v-model="state2.stu2.id">-->
        <!--            <input type="text" v-model="state2.stu2.name">-->
        <!--            <input type="text" v-model="state2.stu2.age">-->
        <!--            <input type="submit" label="点击" @click="addStu">-->
        <!--        </form>-->
        <!--        <ul>-->
        <!--            <li v-for="(item,index) in state.stus"-->
        <!--                :key="item.id" style="list-style: none; text-align: center"-->
        <!--                @click="remSU(index)">-->
        <!--                {{item.name}}-{{item.age}}-->
        <!--            </li>-->
        <!--        </ul>-->
        <!--如果是通过ref创建的数据。那么在template中使用的时候不用通过.value来获取 因为Vue会自动给我吗添加.value-->
        <!--        <p>{{age}}</p>-->
        <!--        <p>{{age.value}}</p>-->
        <!--        <button @click="myFn">add</button>-->

        <p>{{states2.a}}</p>
        <p>{{states2.gf.b}}</p>
        <p>{{states2.gf.f.c}}</p>
        <p>{{states2.gf.f.s.d}}</p>
        <button @click="myFn1">修改</button>
    </div>
    <!--  <router-view/>-->
</template>

<script>
    import {ref, reactive, isRef, isReactive} from 'vue'
    import useRemoveStudent from "./remove";
    import useAddStudent from "./add";
    // import {reactive} from 'vue'


    /*
    * ref的本质就是reactive，也是用来实现响应式数据的方法
    * 由于reactive必须传递一个对象。所以导致在企业开发中
    * 我们只想让某个变量实现响应式的时候会非常麻烦 vue3就提供了ref方法，实现对简单值的监听
    *
    * ref本质其实还是reactive
    *  系统会自动根据我们给ref传入的值将它转换成ref(xxx) => reactive({value:xx})
    *
    * 注意点:
    *    vue中使用ref的值不用通过value获取
    *    js中使用ref的值必须通过value获取
    * */

    /*
    * reactive和ref的区别
    *  ref 和 reactive的区别
    * 如果在templata里使用的是ref类型的数据，那么Vue会自动帮我们添加.value
    * 如果在templata里使用的是reactive类型的数据，那么Vue会自动不帮我们添加.value
    *
    * Vue是如何决定是否需要自动添加.value的
    * Vue在解析数据之前，会自动判断这个数据是否是ref类型，如果是就自动添加.value，如果不是就不添加.value
    *
    * vue是如何判断当前的数据是否是ref类型的
    * 通过当前数据的__v_ref来判断的
    * 如果有这个私有的属性，并且取值为true,那么就代表是一个ref类型的数据
    * */
    export default {
        name: 'App',
        // setup函数是组合api的入口函数
        // setup() {
        //     //ref函数只能监听简单类型的变化，不能监听复杂类型的变化（对象/数组）
        //     // let count = ref(0);
        //     //
        //     // function add() {
        //     //     this.count++
        //     // }
        //     let {state, remSU} = useRemoveStudent();
        //     let {state2, addStu} = useAddStudent(state);
        //     return {state, remSU, state2, addStu}
        // }
        ////////////////////////////混合使用
        // data: function () {
        //     return {
        //         name: 'lnj'
        //     }
        // },
        // methods: {
        //     myFn1() {
        //         alert('abc');
        //     }
        // },
        // setup() {
        //     let age = ref(18);
        //     function myFn2() {
        //     alert('弹出工具');
        //     }
        // }
        //     setup() {
        //     //创建一个响应式数据
        //     //本质就是传入的数据包装成一个proxy对象
        //     let state = reactive({
        //         age:'123'
        //     })
        //     function myAdd(){
        //         state.age++
        //     }
        //     return {state ,myAdd}
        // }
        // setup(){
        //       let age = reactive({
        //           value:18
        //       })
        //     let state= ref(18);
        //     //判断是否是ref类型还是reactive类型
        //     function myFn(){
        //           console.log(isRef(age));
        //            console.log(isReactive(age))
        //     }
        //     return {age, state, myFn}
        // }

        //递归监听
         /*
         * 默认情况下，无论是通过ref还是reactive都是递归监听
         *
         * 递归监听存在的问题 ？
         * 数据量较大，非常消耗性能
         *
         * 3:，非递归监听
         * */


        setup() {
            // let states=reactive({
            //     a:'a',
            //     gf:{
            //         b:'b',
            //         f:{
            //             c:'c',
            //             s:{
            //                 d:'d'
            //             }
            //         }
            //     }
            // });
            //获取里面的数据必须用.value获取
            let states2 = ref({
                a: 'a',
                gf: {
                    b: 'b',
                    f: {
                        c: 'c',
                        s: {
                            d: 'd'
                        }
                    }
                }
            });

            function myFn1() {
                states2.value.a = '1';
                states2.value.gf.b = '2';
                states2.value.gf.f.c = '3';
                states2.value.gf.f.s.d = '4'
            }

            return {states2, myFn1}
        }
    }
</script>
<style scoped>

</style>
