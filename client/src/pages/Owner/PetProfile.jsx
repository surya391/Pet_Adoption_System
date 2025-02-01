import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {getPet, singlePet, profilePet, updatePet, deletePet } from "../../slices/PetSlice"

function PetProfile(){
    const dispatch = useDispatch();
    const { serverError, petDetails, isLoading } = useSelector(state => state.pet);
    const [ form, setFormData ] = useState({
        petImage: null,
        petName: "",
        petType:"",
        petAge:"",
        gender:""
    })
    const [ petPicPreview, setPicPreview ] =useState(null);
    const [ clientErrors, setClientErrors ] = useState(null);

    useEffect(()=>{
        if(petDetails){
            setFormData
        }
    })
}
export default PetProfile