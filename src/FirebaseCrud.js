import {Container , Grid , Segment , Input , Form , Button , Table ,Icon} from "semantic-ui-react";
import React, { useState , useEffect} from "react";
import Header from './Header'
import firebase from './Firebase'

function FirebaseCrud() {

    const [aFirstName , setaFirstName] = useState("");
    const [aLastName , setaLastName] = useState("");
    const [aPhone,setaPhone]= useState("");
    const [aCity, setaCity] = useState("");
    const [aEmail , setaEmail] = useState("");

    const [userData, setuserData] = useState([]);

    const [uFirstName , setuFirstName] = useState("");
    const [uLastName , setuLastName] = useState("");
    const [uPhone,setuPhone]= useState("");
    const [uCity, setuCity] = useState("");
    const [uEmail , setuEmail] = useState("");

    const [userId, setuserId] = useState("")
   
    useEffect(()=>{
        const firestore = firebase.database().ref('/UserInfo');
        firestore.on('value', (response) => {
            const data = response.val();

            let userInfo = [];
            for(let id in data){
                userInfo.push({
                    id:id,
                    FirstName : data[id].FirstName,
                    LastName : data[id].LastName,
                    Phone : data[id].Phone,
                    City : data[id].City,
                    Email: data[id].Email

                })
            }
            setuserData(userInfo)
        })
    },[])

   const  handleAdduser =()=>{
        const firestore = firebase.database().ref("/UserInfo");
        let data = {
            FirstName : aFirstName,
            LastName : aLastName ,
            Phone : aPhone,
            City : aCity,
            Email : aEmail
        }
        firestore.push(data)
        setaFirstName('');
        setaLastName('');
        setaPhone('');
        setaCity('');
        setaEmail('');
    }

    const handleUpdateuser = () => {
        const firestore = firebase.database().ref('/UserInfo').child(userId);
        firestore.update({
            FirstName : uFirstName,
            LastName : uLastName ,
            Phone : uPhone,
            City : uCity,
            Email : uEmail
        })
        setuFirstName('');
        setuLastName('');
        setuPhone('');
        setuCity('');
        setuEmail('');

    }

    const handleDeleteclick = (id) =>{
        const firestore = firebase.database().ref('/UserInfo').child(id);
        firestore.remove();

    }

    const handleUpdateclick = (data) =>{
        setuFirstName(data.FirstName);
        setuLastName(data.LastName);
        setuPhone(data.Phone);
        setuCity(data.City);
        setuEmail(data.Email)

        setuserId(data.id)

    }

    return ( 
        <div ClassName = "ui hidden divider">
            <Header/>
            <Container style ={space}>
                <Grid>
                    <Grid.Row columns="2">
                        <Grid.Column>
                            <Segment padded="very" >
                                <h1>ADD USER</h1>
                                <Form>
                                    <Form.Field>
                                        <label>First Name</label>
                                        <Input type="text" placeholder="First Name" Focus value={aFirstName}
                                         onChange={(e)=>{
                                             setaFirstName(e.target.value)
                                         }} ></Input>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Last Name</label>
                                        <Input type="text" placeholder="Last Name" Focus value={aLastName}
                                        onChange={(e)=>{
                                            setaLastName(e.target.value)
                                        }}  ></Input>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Phone</label>
                                        <Input type="number" placeholder="Phone" Focus value={aPhone}
                                        onChange={(e)=>{
                                            setaPhone(e.target.value)
                                        }}  ></Input>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>City</label>
                                        <Input type="text" placeholder="City" Focus value={aCity}
                                        onChange={(e)=>{
                                            setaCity(e.target.value)
                                        }}  ></Input>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Mail</label>
                                        <Input type="email" placeholder="Email" Focus value={aEmail}
                                         onChange={(e)=>{
                                            setaEmail(e.target.value)
                                        }}  ></Input>
                                    </Form.Field> 
                                    <Form.Field>
                                        <Button className="ui inverted green button" onClick={()=>{
                                            handleAdduser()
                                        }} >
                                            {""}
                                            Add User
                                            
                                            </Button>
                                    </Form.Field>
                                </Form>
                            </Segment>
                        </Grid.Column>

                        <Grid.Column>
                        <Segment padded="very" >
                                <h1>Update USER</h1>
                                <Form>
                                    <Form.Field>
                                        <label>First Name</label>
                                        <Input type="text" placeholder="First Name" Focus value={uFirstName}
                                         onChange={(e)=>{
                                             setuFirstName(e.target.value)
                                         }} ></Input>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Last Name</label>
                                        <Input type="text" placeholder="Last Name" Focus value={uLastName}
                                        onChange={(e)=>{
                                            setuLastName(e.target.value)
                                        }}  ></Input>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Phone</label>
                                        <Input type="number" placeholder="Phone" Focus value={uPhone}
                                        onChange={(e)=>{
                                            setuPhone(e.target.value)
                                        }}  ></Input>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>City</label>
                                        <Input type="text" placeholder="City" Focus value={uCity}
                                        onChange={(e)=>{
                                            setuCity(e.target.value)
                                        }}  ></Input>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Mail</label>
                                        <Input type="email" placeholder="Email" Focus value={uEmail}
                                         onChange={(e)=>{
                                            setuEmail(e.target.value)
                                        }}  ></Input>
                                    </Form.Field> 
                                    <Form.Field>
                                        <Button className="ui inverted blue button" onClick={()=>{
                                            handleUpdateuser()
                                        }} >
                                            
                                            Update User
                                            
                                            </Button>
                                    </Form.Field>
                                </Form>
                            </Segment>
                       
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns="1">
                        <Grid.Column>
                                   {
                                       userData.length === 0 ? <Segment padded="very" >
                                           
                                               Opps , Nodata available
                                           
                                       </Segment>:
                                       <Segment >
                                           <Table celled fixed singeLine textAlign="center">
                                               <Table.Header  >
                                                   <Table.Row>
                                                        <Table.HeaderCell>FirstName</Table.HeaderCell>
                                                        <Table.HeaderCell>LastName</Table.HeaderCell>
                                                        <Table.HeaderCell>Phone</Table.HeaderCell>
                                                        <Table.HeaderCell>City</Table.HeaderCell>
                                                        <Table.HeaderCell>Email</Table.HeaderCell>

                                                        <Table.HeaderCell>EDIT</Table.HeaderCell>
                                                        <Table.HeaderCell>DELETE</Table.HeaderCell>
                                                   </Table.Row>
                                               </Table.Header>
                                               {
                                                   userData.map((data,index)=>{
                                                       return <Table.Body>
                                                           <Table.Cell>{data.FirstName}</Table.Cell>
                                                           <Table.Cell>{data.LastName}</Table.Cell>
                                                           <Table.Cell>{data.Phone}</Table.Cell>
                                                           <Table.Cell>{data.City}</Table.Cell>
                                                           <Table.Cell>{data.Email}</Table.Cell>
                                                            <Table.Cell>
                                                               <Button color="blue" onClick={()=>{handleUpdateclick(data)}} >
                                                               Update
                                                               </Button>
                                                            </Table.Cell>
                                                           <Table.Cell>
                                                                <Button color = "red" onClick={()=>{handleDeleteclick(data.id)}}>
                                                                   Delete
                                                               </Button>
                                                           </Table.Cell>

                                                       </Table.Body>
                                                   })
                                               }
                                           </Table>
                                       </Segment>
                                   }        
                        </Grid.Column>
                    </Grid.Row>

                                            

                </Grid>
            </Container>
        </div>
    )
       
    ;
}

const space = {
    margin: 30
}

export default FirebaseCrud;