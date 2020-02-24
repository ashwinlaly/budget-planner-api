

Performance Testing
    https://artillery.io/docs/getting-started/
    1. cd test 
    2. artillery run index.yml


Export DB:
  mongoexport --db=planner --collection=budget --out=/path/planner.json --pretty
  mongoimport --db=planner2 --collection=budget --file=/path/planner.json

const createPolicy = (name, amount) => {
  return {
    type : 'CREATE_POLICY',
    payload : {
      name,amount
    }
  }
}

const deletePolicy = (name) => {
  return {
    type : "DELETE_POLICY",
    payload :{
      name
    }
  }
}

const createClaim = (name, amount) => {
  return {
    type : "CREATE_CLAIM",
    payload : {
      name, amount
    }
  }
}

const claimsHistory = (claimhistory = [], action) => {
  if(action.type === 'CREATE_CLAIM'){
    return [...claimhistory, action.payload]
  }
  return claimhistory;
}

const accounting = (money = 100, action) => {
  if(action.type === 'CREATE_CLAIM') {
    return money - action.payload.amount
  }
  if(action.type === 'CREATE_POLICY') {
    return money + action.payload.amount
  }
  return money
}

const policies = (policy = [], action) => {
  if(action.type === 'CREATE_POLICY'){
    return [...policy, action.payload.name]
  }
  if(action.type === 'DELETE_POLICY'){
    return policy.filter(po => po!= action.payload.name)
  }
  return policy
}

const { createStore, combineReducers} = Redux

const Department = combineReducers({
  claimsHistory, accounting, policies
})

const store = createStore(Department)

store.dispatch(createPolicy('Ashwin', 100))
store.dispatch(createPolicy('joel', 100))
store.dispatch(createPolicy('jismon', 100))

store.dispatch(createClaim('joel', 200))
store.dispatch(deletePolicy('Ashwin'))
// console.clear()
console.log(store.getState())