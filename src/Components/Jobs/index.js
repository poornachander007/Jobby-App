import './index.css'
import Header from '../Header'

const Jobs = props => {
  const {salaryRangesList} = props
  console.log(props, '********** salaryRangesList **************')
  return (
    <div>
      <Header />
      <h1>Jobs</h1>
    </div>
  )
}

export default Jobs
