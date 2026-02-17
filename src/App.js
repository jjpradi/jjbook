import './App.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route
import {Route, Link, BrowserRouter, Switch} from 'react-router-dom'
const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

import NotFound from './components/NotFound'
import Context from './context/Context'
import Bookshelves from './components/Bookshelves'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Home from './components/Home'
import Counter from './components/Counter'
import Login from './components/Login'
import BookDetails from './components/BookDetails'

import {Component} from 'react'

class App extends Component {
  state = {
    isNavClicked: false,
    readstatus: '',
    commonBookList: [],
    ischanged: false,
    gettingList: true,
  }

  changeContext = () => {
    this.setState(prevState => ({
      isNavClicked: !prevState.isNavClicked,
    }))
  }

  getList = filtered => {
    console.log('filtered')

    this.setState({commonBookList: filtered, gettingList: false})
  }

  changeStatus = (id, val) => {
    console.log(id, val)

    this.setState({readstatus: val, ischanged: true})

    console.log('cookBookList')

    this.setState(
      prevState => ({
        commonBookList: prevState.commonBookList.map(e =>
          e.id === id ? {...e, readStatus: val} : e,
        ),
      }),
      this.seeChange,
    )
  }

  seeChange = () => {
    console.log('changedList')
  }

  render() {
    const {isNavClicked, readstatus, commonBookList, gettingList, ischanged} =
      this.state

    return (
      <Context.Provider
        value={{
          commonBookList,
          getList: this.getList,
          ischanged,
          isNavClicked,
          gettingList,
          changeStatus: this.changeStatus,
          readstatus,
          changeContext: this.changeContext,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route component={Login} path="/login" />

            <ProtectedRoute exact component={Home} path="/" />

            <ProtectedRoute
              exact
              bookshelvesList={bookshelvesList}
              component={Bookshelves}
              path="/shelf"
            />

            <ProtectedRoute exact component={BookDetails} path="/books/:id" />

            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Context.Provider>
    )
  }
}

export default App
