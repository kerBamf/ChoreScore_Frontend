import { useEffect, useState } from 'react'
import { taskLoader, deleteTask } from '../apiCalls'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'