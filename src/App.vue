<template>
    <!--    <div>-->
    <!--&lt;!&ndash;                <form style="text-align: center">&ndash;&gt;-->
    <!--&lt;!&ndash;                    <input type="text" v-model="state2.stu2.id">&ndash;&gt;-->
    <!--&lt;!&ndash;                    <input type="text" v-model="state2.stu2.name">&ndash;&gt;-->
    <!--&lt;!&ndash;                    <input type="text" v-model="state2.stu2.age">&ndash;&gt;-->
    <!--&lt;!&ndash;                    <input type="submit" label="点击" @click="addStu">&ndash;&gt;-->
    <!--&lt;!&ndash;                </form>&ndash;&gt;-->
    <!--&lt;!&ndash;                <ul>&ndash;&gt;-->
    <!--&lt;!&ndash;                    <li v-for="(item,index) in state.stus"&ndash;&gt;-->
    <!--&lt;!&ndash;                        :key="item.id" style="list-style: none; text-align: center"&ndash;&gt;-->
    <!--&lt;!&ndash;                        @click="remSU(index)">&ndash;&gt;-->
    <!--&lt;!&ndash;                        {{item.name}}-{{item.age}}&ndash;&gt;-->
    <!--&lt;!&ndash;                    </li>&ndash;&gt;-->
    <!--&lt;!&ndash;                </ul>&ndash;&gt;-->
    <!--&lt;!&ndash;        如果是通过ref创建的数据。那么在template中使用的时候不用通过.value来获取 因为Vue会自动给我吗添加.value&ndash;&gt;-->
    <!--&lt;!&ndash;                        <p>{{age}}</p>&ndash;&gt;-->
    <!--&lt;!&ndash;                        <p>{{age.value}}</p>&ndash;&gt;-->
    <!--&lt;!&ndash;                        <button @click="myFn1">add</button>&ndash;&gt;-->

    <!--&lt;!&ndash;                <p>{{states2.a}}</p>&ndash;&gt;-->
    <!--&lt;!&ndash;                <p>{{states2.gf.b}}</p>&ndash;&gt;-->
    <!--&lt;!&ndash;                <p>{{states2.gf.f.c}}</p>&ndash;&gt;-->
    <!--&lt;!&ndash;                <p>{{states2.gf.f.s.d}}</p>&ndash;&gt;-->
    <!--&lt;!&ndash;                <button @click="myFn1">修改</button>&ndash;&gt;-->
    <!--        <p>{{obj}}</p>-->
    <!--&lt;!&ndash;        <button @click="myFn"></button>&ndash;&gt;-->
    <!--    </div>-->
    <!--    &lt;!&ndash;  <router-view/>&ndash;&gt;-->
    <div>
        <p>45454</p>
    </div>
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
        * shallowRef/shallowReactive
        *
        * 4,应用场景
        * 一般情况下我们只需要使用ref和reactive即可
        * 只有在需要监听的数据量较大的时候，才会使用shallowRef.shallowReactive
        *
        *
        * triggerRef:根据传进来的值，界面更新传进来的值
        *
        * */

        /***
         *注意点：
         * 如果是通过shallref创建数据,那么Vue监听的是.value的变化，并不是我们第一层的变化    没有.value是无法监听到的    如果是嵌套对象没用.value也是无法监听到的
         *
         * triggerRef:根据传进来的值，界面就会更新传进来的值
         ，其余的值是不会发生变化的     *
         * vue3只提供了triggerRef方法，没有提供triggerReactive方法
         * 所以如果是reactive类型的数据，那么是无法主动触发界面更新
         *
         *
         */
        /**
         * 本质：ref => reactive
         * ref(10) => reactive({value:10})
         *
         *shallowRef => shallowReactive
         *shallReactive(10) =>shallowReactive({value:10})
         *
         * 所以如果是通过shallowRef 创建的数据，它监听的是.value的变化   因为底层本质上value才是第一层
         * */
        // setup() {
        //         let states=reactive({
        //             a:'a',
        //             gf:{
        //                 b:'b',
        //                 f:{
        //                     c:'c',
        //                     s:{
        //                         d:'d'
        //                     }
        //                 }
        //             }
        //         });
        //         //获取里面的数据必须用.value获取
        //         let states2 = ref({
        //             a: 'a',
        //             gf: {
        //                 b: 'b',
        //                 f: {
        //                     c: 'c',
        //                     s: {
        //                         d: 'd'
        //                     }
        //                 }
        //             }
        //         });
        //         methods:{
        //             function myFn1() {
        //                 console.log(111)
        //                 states2.value.a = '1';
        //                 states2.value.gf.b = '2';
        //                 states2.value.gf.f.c = '3';
        //                 states2.value.gf.f.s.d = '4'
        //                 console.log(states2)
        //                 console.log(states2.gf)
        //                 console.log(states2.gf.f)
        //                 console.log(states2.gf.f.s)
        //             }
        //         }
        //
        //         return {states2, myFn1}
        //     }
        setup() {
            //state 和 obj的关系：
            //     引用关系，state的本质是一个proxy对象，在这个proxy对象中引用了obj
            //
            let obj = {
                name: 'nanj',
                age: 18
            }
            let state = reactive(obj)
            console.log(obj === state)   //false
            //toRaw:获取reactive 或者ref 原始数据（未包装之前的数据）
            function myFn() {
                //如果直接修改obj,那么是无法触发界面更新的
                //只有通过包装之后的对象来修改，才会触发界面更新

                //  ref和reactive数据类型的特点
                // 每次修改都会被追踪，都会更新ui界面，这样非常消耗性能的
                //所以我们的一些操作不需要追踪，不需要更新ui界面，那么这个时候，就可以通过toRow方法拿到它的原始数据
                //对原始数据进行修改，这样就不会被追踪，就不会更新ui界面，这样性能就好
                obj.name = '修改后的'
                console.log(obj)
            }
            return {
                obj, myFn
            }
        }
    }
</script>
<style scoped>

</style>
