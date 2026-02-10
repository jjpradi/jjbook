import React from 'react'

const Context = React.createContext({
  isNavClicked: false,
  changeContext: () => {},

  readstatus: '',
  changeStatus: () => {},

  commonBookList: [],
  getList: [],
  gettingList:true,
  isChanged: false,
})

export default Context
