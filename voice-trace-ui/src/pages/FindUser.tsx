import React, { useState } from 'react';
import '../styles/FindUser.css';
import { BsSearch } from 'react-icons/bs';
import { IoMdAddCircle } from 'react-icons/io'
import { RiDeleteBin5Line } from 'react-icons/ri';
import { VscEdit } from 'react-icons/vsc';
import { CgProfile } from 'react-icons/cg';
import { MdLogout } from 'react-icons/md';
import axios from 'axios';






const FindUser: React.FC = () => {

  const [searchValue, setSearchValue] = useState('');
  const [usersInfos, setUsersInfos] = useState([]);
  const [adminInfos, setAdminInfos] = useState<Array<any>>([]);
  const [specificUsersInfos, setSpecificUsersInfos] = useState([]);




  const getEMployees = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/getAllEmployees`);

      setUsersInfos(response.data);
      return;

    } catch (error) {
      console.log("Erreur de la recuperation des employees", error);
      return [];

    }
  }

  const getSpecificEMployees = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/getAllEmployees`);


      setSpecificUsersInfos(response.data);
      return;

    } catch (error) {
      console.log("Erreur de la recuperation des employees", error);
      return [];

    }
  }


  const getAdmin = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/getAdmin`);

      setAdminInfos(response.data);

      return;

    } catch (error) {
      console.log("Erreur de la recuperation des infos de l admin", error);
      return [];

    }
  }






  getEMployees();

  const boxes = [];
  const users = usersInfos;


  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const firstname = user['firstname'];
    const lastname = user['lastname'];
    boxes.push(
      <div className='card' key={i}>
        <div>



          <div className='containerProfile'></div>

          <div className='userCompleteName'> {firstname} {lastname} </div>


          <div className='iconContainer'>
            <VscEdit className='iconModify' />
            <RiDeleteBin5Line className='iconDelete' />

          </div>






        </div>

      </div>
    );
  }




  getSpecificEMployees();
  const specificBoxes = [];
  const specificUsers = specificUsersInfos;

  for (let i = 0; i < specificUsers.length; i++) {
    const specificUser = specificUsers[i];
    const firstname: string = specificUser['firstname'];
    const lastname: string = specificUser['lastname'];
    if ((firstname + ' ' + lastname + '       ').includes(searchValue)) {
      specificBoxes.push(
        <div className='card' key={i}>
          <div>



            <div className='containerProfile'></div>

            <div className='userCompleteName'> {firstname} {lastname} </div>


            <div className='iconContainer'>
              <VscEdit className='iconModify' />
              <RiDeleteBin5Line className='iconDelete' />

            </div>






          </div>

        </div>
      );

    }


  }










  getAdmin();






  return (

    <div>



      <nav className="navbar">

        <CgProfile className='iconProfile' />

      </nav>


      <div className='infoProfile'>
        <div>


          <div className='containerAccProfile'></div>
          <div className='completeNameAcc'>{adminInfos.length > 0 ? adminInfos[0].firstname : ''} {adminInfos.length > 0 ? adminInfos[0].lastname : ''}  </div>
          <div className='emailAcc'>{adminInfos.length > 0 ? adminInfos[0].email : ''} </div>
          <div className='logoutContainer'>
            <div className='logoutIconContainer'>
              <MdLogout className='logoutIcon' />
            </div>
            <div className='logoutTextContainer'>Logout</div>

          </div>




        </div>
      </div>



      <div className="searchBarPosition">
        <div className="containerIconSearch" >

          < BsSearch className=' iconSearch' />
        </div>
        <input type='text' placeholder="Rechercher..." className='searchBaar ' value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)} />




      </div>


      {searchValue === "" ? (
        <div className='boxContainer'> {boxes}</div>
      ) : (
        <>
          <div className='boxContainer'> {specificBoxes}</div>

        </>
      )}


      <div><IoMdAddCircle className='iconAdd' /></div>




    </div>


  );
};

export default FindUser;