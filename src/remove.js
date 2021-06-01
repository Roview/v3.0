import {reactive} from "vue";

function useRemoveStudent() {
    //监听数组的变化
    let state = reactive({
        stus: [
            {id: 1, name: "zx", age: 10},
            {id: 2, name: "asdzx", age: 30},
            {id: 3, name: "zfdsfx", age: 25}
        ]
    });

    function remSU(index) {
        state.stus = state.stus.filter((stu, ind) => ind !== index)
    }

    // return {count, add}
    return {state, remSU}
}
export default useRemoveStudent;
