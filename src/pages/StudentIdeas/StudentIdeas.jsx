import { useParams } from 'react-router-dom'
import styles from '../../styles'
import { useEffect, useState } from 'react'

function StudentIdeas() {
    const { id } = useParams()
    const [student, setStudent] = useState({})
    const [studentIdeas, setStudentIdeas] = useState([])
    const [filteredStudentIdeas, setFilteredStudentIdeas] = useState([])

    const getStudentData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/students/${id}`)
            const data = await response.json()
            setStudent(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {

    })


    return (
        <main className={`${styles.outerWrapper}`}>
            <div className={`${styles.wrapper}`}>
                <h1>Student Name</h1>
            </div>
        </main>
    )
}

export default StudentIdeas