import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Spinner from '../components/Spinner';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';


const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');


    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5555/books');
                setBooks(response.data.data || []);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchBooks();
    }, []);

    return (
        <div className='p-4'>
            <div className='flex justify-center items-center gap-x-4'>
                <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                    onClick={() => setShowType('table')}
                > Table
                </button>
                <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                    onClick={() => setShowType('card')}
                > Card
                </button>
            </div>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner /> 
            ) : books.length === 0 ? (
                <div className='text-center py-8'>
                    <p className='text-gray-500 text-xl'>No books found</p>
                    <p className='text-gray-400'>Click the + button to add your first book</p>
                </div>
            ) : showType === 'table' ? (
                <BooksTable books={books} />
            ) : (
                <BooksCard books={books} />
            )}
        </div>
    )
}

export default Home
