import React from "react"
import { Button, Input } from "reactstrap"

// a basic form
const SubscribeForm = ({ status, message, onValidated }) => {
  let email, name
  const submit = () =>
    email &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
    })

  return (
    <div>
      {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "green" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <input
        style={{ width: "100%", padding: 3, margin: 5 }}
        ref={node => (email = node)}
        type="email"
        placeholder="Your email"
      />
      <br />
      <Button
        style={{
          fontSize: ".9em",
          width: "40%",
          padding: 3,
          marginLeft: "30%",
          marginRight: "30%",
          textAlign: "center",
        }}
        color="info"
        onClick={submit}
      >
        Subscribe
      </Button>
    </div>
  )
}

export default SubscribeForm
