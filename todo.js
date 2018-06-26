let vm  = new Vue({
  el:"#app",
  data:{
    todos:[
      {isSelect:false,title:"吃饭"},

      {isSelect:false,title:"睡觉"}
    ],
    title:"",
    cur :"",
    hash:"",

  },
  created(){
   this.todos = JSON.parse(localStorage.getItem('data')) || this.todos
    //监控hash值
    this.hash = window.location.hash || "all"
    window.addEventListener("hashchange",()=>{
     
      this.hash = window.location.hash.slice(2);
     
    },false)
  },
    
  watch:{
    todos:{

      handler(){
        localStorage.setItem('data',JSON.stringify(this.todos))
      },deep:true
    }

  },
  computed:{
    filterTodos(){
      console.log(this.todos.filter(item=>item.isSelect))
      if (this.hash === "all") return this.todos;
      if (this.hash === "finish") return this.todos.filter(item=>item.isSelect);
      if (this.hash === "unfinish") return this.todos.filter(item=>!item.isSelect) 
    },


    count(){
      return this.todos.filter(item=>!item.isSelect ).length
    },
    
  },
  directives:{
    focus(el,bingdings){
     
      if (bingdings.value) {

        el.focus();
      }
    }
  },
  methods:{
    add(){

      this.todos.push({
        isSelect:false,
        title:this.title
      })
      this.title =""
    },
    close(todo){
     
     this.todos = this.todos.filter(item=>item!=todo)
    },
    remember(todo){
      console.log(todo);
      this.cur = todo;
      console.log(this.cur )
    },
    cancel(){
      this.cur = ""
    }
  }

})