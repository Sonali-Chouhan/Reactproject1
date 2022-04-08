import React from "react";
 class ChildComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      User: [],
    };

  }
  componentDidMount() {
    var User = JSON.parse(localStorage.getItem("User"));
    if (User) {
      this.setState({
        User,
      });
    }
  }
  handleDelete = (index) => {
     var User = this.state.User;
    JSON.parse(localStorage.getItem("User"));
    if (window.confirm("Are you sure you want to delete?")) {
      User.splice(index, 1);
    
      localStorage.setItem("User", JSON.stringify(User));
      this.setState({
        User,
      });
    }
  };
  handleEdit=(id)=>{
     this.props.history.push('test/'+id)
  }
  render() {
    
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Table component</h1>
       <table>
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {this.state.User.map((data,id) => {
              return (
                <tr key={id}>
                
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.email}</td>
                  <td>{data.Phone}</td>
                  <td>
                    <button onClick={() => this.handleDelete(id)}>
                      Delete
                    </button></td>
                    <td>
                    <button onClick={()=>this.handleEdit(id)}>
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
      </div>
    );
  }
}
export default ChildComponent;
      