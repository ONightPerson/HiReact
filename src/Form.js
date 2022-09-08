import { Component } from "react";

class Form extends Component {
  initState = {
    name: "",
    job: "",
  };

  state = this.initState;

  handleChange = (event) => {
    console.log("event", event);
    const { name, value } = event.target;
    console.log("name", name, "value", value);
    this.setState({
      [name]: value,
    });
  };

  submitForm = () => {
    this.props.handleSubmit(this.state);
    this.setState(this.initState);
  };

  render() {
    const { name, job } = this.state;
    return (
      <form>
        <label>
          name
          <textarea
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="job">Job</label>
        <input
          type="text"
          name="job"
          id="job"
          value={job}
          onChange={this.handleChange}
        />
        <input type="button" value="提交" onClick={this.submitForm} />
      </form>
    );
  }
}

export default Form;
