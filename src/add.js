import {reactive} from "vue";

function useAddStudent(state) {
    let state2 = reactive({
        stu2: {
            id: '',
            name: '',
            age: ''
        }
    });

    function addStu(e) {
        //组织默认行为
        e.preventDefault();
        console.log(state2.stu2);
        const stu = Object.assign({}, state2.stu2);
        state.stus.push(stu);
        state2.stu2.id = '';
        state2.stu2.name = '';
        state2.stu2.age = '';
    }
    return {state2 , addStu}
}
export  default  useAddStudent
