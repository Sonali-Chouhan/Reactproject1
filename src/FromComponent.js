import React from "react";
import "./From.css";

export default class Frompage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      Password: "",
      Phone: "",
      User: [],
      formErrors: {},
      id: props.match.params.id,
    };

    this.handleChangeValue = this.handleChangeValue.bind(this);
  }

  componentDidMount() {
    console.log(122,this.state.id)
    if (this.state.id) {
      var id = this.state.id;
      var Data = JSON.parse(localStorage.getItem("User"));
      let obj = Data[id];
      this.setState({
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
        Phone: obj.Phone,
      });
    }
  }
  handleFormValidation() {
    const User = this.state.User;
    let formErrors = {};
    let formIsValid = true;

    //Student name
    if (!this.state.firstName) {
      formIsValid = false;
      formErrors["firstName"] = "Name is required.";
    }

    if (!this.state.lastName) {
      formIsValid = false;
      formErrors["lastName"] = "Name is required.";
    }

    //Email
    if (!this.state.email) {
      formIsValid = false;
      formErrors["email"] = "Email id is required.";
    } else if (
      !/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(this.state.email)
    ) {
      formIsValid = false;
      formErrors["email"] = "Invalid email id.";
    }
    //Phone number
    if (!this.state.Phone) {
      formIsValid = false;
      formErrors["Phone"] = "Phone number is required.";
    } else {
      var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[789]\d{9}$/;
      if (!mobPattern.test(this.state.Phone)) {
        formIsValid = false;
        formErrors["Phone"] = "Invalid phone number.";
      }
    }

    this.setState({ formErrors: formErrors });

    return formIsValid;
  }
  handleChangeValue(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    var items = JSON.parse(localStorage.getItem("User"));
    items=items?items:[]

    if (this.state.id) {
      

      items.splice(this.state.id, 1, {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        Phone: this.state.Phone,
      });
    }
    else{
      items.push({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        Password: this.state.Password,
        Phone: this.state.Phone,
      });

    }
    if (this.handleFormValidation()) {
      alert("You have been successfully registered.");
      localStorage.setItem("User", JSON.stringify(items));
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        Password: "",
        Phone: "",
        User:items
      });
      console.log("999999",items)
      this.props.history.push("/table");
    }
  };
  render() {
    const { firstName, lastName, email, Password, Phone } =
      this.state.formErrors;
    return (
      <div className="formDiv">
        <h2 style={{ textAlign: "center" }}>Registration Form </h2>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="firstname">firstName</label>
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChangeValue}
                placeholder="User First Name"
                className={firstName ? " showError" : ""}
              />
              {firstName && (
                <div style={{ color: "red", paddingBottom: 10 }}>
                  {firstName}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="lastName">lastName</label>
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChangeValue}
                placeholder="User Last Name"
                className={lastName ? " showError" : ""}
              />
              {lastName && (
                <div style={{ color: "red", paddingBottom: 10 }}>
                  {lastName}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="email">Email Id</label>
              <input
                type="text"
                value={this.state.email}
                name="email"
                onChange={this.handleChangeValue}
                placeholder="Your email id.."
                className={email ? " showError" : ""}
              />
              {email && (
                <div style={{ color: "red", paddingBottom: 10 }}>{email}</div>
              )}
            </div>
            <div>
              <label htmlFor="Password">Password</label>
              <input
                type="text"
                value={this.state.Password}
                name="Password"
                onChange={this.handleChangeValue}
                placeholder="Your Password"
                className={Password ? " showError" : ""}
              />
              {Password && (
                <div style={{ color: "red", paddingBottom: 10 }}>
                  {Password}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="Phone">Phone Number</label>
              <input
                type="text"
                placeholder="Enter Contact No."
                value={this.state.Phone}
                name="Phone"
                onChange={this.handleChangeValue}
                className={Phone ? " showError" : ""}
              />
              {Phone && (
                <div style={{ color: "red", paddingBottom: 10 }}>{Phone}</div>
              )}
            </div>

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
