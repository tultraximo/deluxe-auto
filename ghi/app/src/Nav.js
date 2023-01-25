import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/">Home</a>
                </li> */}
            <li className="nav-item">
            <NavLink className="nav-link" to="technician/">Add Technician</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="appointment/">Add Appointment</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="appointment/list">Display Appointments</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="appointment/history">Appointment History</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
