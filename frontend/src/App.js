import React, { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(false)


  useEffect(() => {
    setLoader(true)
    fetch(`http://langchain.eastus2.cloudapp.azure.com:5000/userslow5`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setData(data)
        setLoader(false)
      })
      .catch((err) => console.log(err))
  }, [])

  async function handleDropdownChange(event) {
    setLoader(true)
    console.log(event?.target.value)

    await fetch(`http://langchain.eastus2.cloudapp.azure.com:5000/${event?.target.value}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setData(data)
        setLoader(false)
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="App">
      <section>
        <h1>ORU Phones</h1>

        <select
          name="oruphone-dropdown"
          className="oruphone-dropdown"
          onChange={handleDropdownChange}
        >
          <option value="userslow5">
            Users which have income lower than $5 USD and have a car of brand
            “BMW” or “Mercedes”.
          </option>
          <option value="usersphone10000">
            Male Users which have phone price greater than 10,000.
          </option>
          <option value="userslastnameM">
            Users whose last name starts with “M” and has a quote character
            length greater than 15 and email includes his/her last name.
          </option>
          <option value="usersbmwandmercedes">
            Users which have a car of brand “BMW”, “Mercedes” or “Audi” and
            whose email does not include any digit.
          </option>
          <option value="userstop10">
            Show the data of top 10 cities which have the highest number of
            users and their average income.
          </option>
        </select>
        <div className="tbl-header">
          <table style={{ cellPadding: '0', cellSpacing: '0', border: '0' }}>
            <thead>
              {data[0]?.user_count ? (
                <tr>
                  <th>Country name</th>
                  <th>User Count</th>
                  <th>Average Income</th>
                </tr>
              ) : (
                <tr>
                  <th style={{ width: '11%' }}>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Income</th>
                  <th>City</th>
                  <th>Car</th>
                  <th>Phone Price</th>
                  <th>Quote</th>
                </tr>
              )}
            </thead>
          </table>
        </div>
        {loader ? (
          <>
            <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </>
        ) : (
          <>
            <div className="tbl-content">
              <table cellpadding="0" cellspacing="0" border="0">
                {data.map((item) => (
                  <tbody>
                    {item.user_count ? (
                      <tr>
                        <td>{item._id}</td>
                        <td>{item.user_count}</td>
                        <td>{item.avg_income} $</td>
                      </tr>
                    ) : (
                      <tr>
                        <td
                          style={{
                            width: '10%',
                            maxWidth: '10%',
                            wordWrap: 'break-word',
                          }}
                        >
                          {item.email}
                        </td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.gender}</td>
                        <td>{item.income}</td>
                        <td>{item.city}</td>
                        <td>{item.car}</td>
                        <td>{item.phone_price}</td>
                        <td>{item.quote}</td>
                      </tr>
                    )}
                  </tbody>
                ))}
              </table>
            </div>
          </>
        )}
      </section>

      <div className="made-with-love">
        Made with
        <i>♥</i> by
        <a target="_blank" rel="noreferrer" href="https://vishnuswaroop.live">
          {' '}
          Vishnu Swaroop
        </a>
      </div>
    </div>
  )
}

export default App
