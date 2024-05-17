import React, { useState } from "react";
import "../style/user.css";

const HorizontalTabs = () => {
  const [activeTab, setActiveTab] = useState("City1"); // Default active tab

  const openCity = (cityName) => {
    setActiveTab(cityName);
  };

  return (
    <>
      {/* Tab buttons */}
      <div className="tab">
        <button
          className={`tablinks ${activeTab === "City1" ? "active" : ""}`}
          onClick={() => openCity("City1")}
          id="defaultOpen"
        >
          <div className="position_name">
            <h3>Modeling Artist</h3>
          </div>
          <div className="space-height"></div>
          <div className="position_info">
            <p>
              We are currently in search of Modelers with minimum of 2-3 years
              of experience to join our Game Art Team
            </p>
          </div>
        </button>
        <button
          className={`tablinks ${activeTab === "City2" ? "active" : ""}`}
          onClick={() => openCity("City2")}
        >
          <div className="position_name">
            <h3>Production Coordinator</h3>
          </div>
          <div className="space-height"></div>
          <div className="position_info">
            <p>
              We are currently in search of Co-Ordinators with minimum of 2
              years of experience to join our Project Management Team
            </p>
          </div>
        </button>
        <button
          className={`tablinks ${activeTab === "City3" ? "active" : ""}`}
          onClick={() => openCity("City3")}
        >
          <div className="position_name">
            <h3>Lighting / Lookdev Artist</h3>
          </div>
          <div className="space-height"></div>
          <div className="position_info">
            <p>
              We are currently in search of Lighting / Lookdev Artists with
              minimum 3-4 years of experience to join our Lighting Team.
            </p>
          </div>
        </button>
        <button
          className={`tablinks ${activeTab === "City4" ? "active" : ""}`}
          onClick={() => openCity("City4")}
        >
          <div className="position_name">
            <h3>Mid-Texturing Artist</h3>
          </div>
          <div className="space-height"></div>
          <div className="position_info">
            <p>
              We are currently in search of Mid Texturing Artists with minimum
              3-4 years of experience to join our Game Art Team
            </p>
          </div>
        </button>
      </div>

      {/* Tab content */}
      <div
        id="City1"
        className="tabcontent"
        style={{ display: activeTab === "City1" ? "block" : "none" }}
      >
        <div className="container">
          <div className="resp_duty">
            <h4>Responsibilities and Duties</h4>
            <ul>
              <li>
                Create models as well as sculpt (sets, props, characters, etc.),
                following the creative direction of the designated supervisor.
              </li>
              <li>
                Follow leads and supervisors' direction, ensuring that the
                models created are precise and accurate.
              </li>
              <li>
                Complete assigned modeling tasks in a timely manner and ensure
                all working files are efficiently organized at all times.
              </li>
              <li>
                Fully comprehend the requirements on the designs, thereby
                creating models true to their designs, whether organic or
                mechanical in nature.
              </li>
              <li>
                Address feedback and modify models by following the creative
                direction of the Supervising Modeler, Production Designer, and
                Cinematics Director/Producer.
              </li>
            </ul>
          </div>

          <div className="resp_duty">
            <h4>Qualifications</h4>
            <ul>
              <li>
                Create models as well as sculpt (sets, props, characters, etc.),
                following the creative direction of the designated supervisor.
              </li>
              <li>
                Follow leads and supervisors' direction, ensuring that the
                models created are precise and accurate.
              </li>
              <li>
                Complete assigned modeling tasks in a timely manner and ensure
                all working files are efficiently organized at all times.
              </li>
              <li>
                Fully comprehend the requirements on the designs, thereby
                creating models true to their designs, whether organic or
                mechanical in nature.
              </li>
              <li>
                Address feedback and modify models by following the creative
                direction of the Supervising Modeler, Production Designer, and
                Cinematics Director/Producer.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        id="City2"
        className="tabcontent"
        style={{ display: activeTab === "City2" ? "block" : "none" }}
      >
        <div className="container">
          <div className="resp_duty">
            <h4>Responsibilities and Duties 2</h4>
            <ul>
              <li>
                Create models as well as sculpt (sets, props, characters, etc.),
                following the creative direction of the designated supervisor.
              </li>
              <li>
                Follow leads and supervisors' direction, ensuring that the
                models created are precise and accurate.
              </li>
              <li>
                Complete assigned modeling tasks in a timely manner and ensure
                all working files are efficiently organized at all times.
              </li>
              <li>
                Fully comprehend the requirements on the designs, thereby
                creating models true to their designs, whether organic or
                mechanical in nature.
              </li>
              <li>
                Address feedback and modify models by following the creative
                direction of the Supervising Modeler, Production Designer, and
                Cinematics Director/Producer.
              </li>
            </ul>
          </div>

          <div className="resp_duty">
            <h4>Qualifications</h4>
            <ul>
              <li>
                Create models as well as sculpt (sets, props, characters, etc.),
                following the creative direction of the designated supervisor.
              </li>
              <li>
                Follow leads and supervisors' direction, ensuring that the
                models created are precise and accurate.
              </li>
              <li>
                Complete assigned modeling tasks in a timely manner and ensure
                all working files are efficiently organized at all times.
              </li>
              <li>
                Fully comprehend the requirements on the designs, thereby
                creating models true to their designs, whether organic or
                mechanical in nature.
              </li>
              <li>
                Address feedback and modify models by following the creative
                direction of the Supervising Modeler, Production Designer, and
                Cinematics Director/Producer.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        id="City3"
        className="tabcontent"
        style={{ display: activeTab === "City3" ? "block" : "none" }}
      >
        <div className="container">
          <div className="resp_duty">
            <h4>Responsibilities and Duties 3</h4>
            <ul>
              <li>
                Create models as well as sculpt (sets, props, characters, etc.),
                following the creative direction of the designated supervisor.
              </li>
              <li>
                Follow leads and supervisors' direction, ensuring that the
                models created are precise and accurate.
              </li>
              <li>
                Complete assigned modeling tasks in a timely manner and ensure
                all working files are efficiently organized at all times.
              </li>
              <li>
                Fully comprehend the requirements on the designs, thereby
                creating models true to their designs, whether organic or
                mechanical in nature.
              </li>
              <li>
                Address feedback and modify models by following the creative
                direction of the Supervising Modeler, Production Designer, and
                Cinematics Director/Producer.
              </li>
            </ul>
          </div>

          <div className="resp_duty">
            <h4>Qualifications</h4>
            <ul>
              <li>
                Create models as well as sculpt (sets, props, characters, etc.),
                following the creative direction of the designated supervisor.
              </li>
              <li>
                Follow leads and supervisors' direction, ensuring that the
                models created are precise and accurate.
              </li>
              <li>
                Complete assigned modeling tasks in a timely manner and ensure
                all working files are efficiently organized at all times.
              </li>
              <li>
                Fully comprehend the requirements on the designs, thereby
                creating models true to their designs, whether organic or
                mechanical in nature.
              </li>
              <li>
                Address feedback and modify models by following the creative
                direction of the Supervising Modeler, Production Designer, and
                Cinematics Director/Producer.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        id="City4"
        className="tabcontent"
        style={{ display: activeTab === "City4" ? "block" : "none" }}
      >
        <div className="container">
          <div className="resp_duty">
            <h4>Responsibilities and Duties 4</h4>
            <ul>
              <li>
                Create models as well as sculpt (sets, props, characters, etc.),
                following the creative direction of the designated supervisor.
              </li>
              <li>
                Follow leads and supervisors' direction, ensuring that the
                models created are precise and accurate.
              </li>
              <li>
                Complete assigned modeling tasks in a timely manner and ensure
                all working files are efficiently organized at all times.
              </li>
              <li>
                Fully comprehend the requirements on the designs, thereby
                creating models true to their designs, whether organic or
                mechanical in nature.
              </li>
              <li>
                Address feedback and modify models by following the creative
                direction of the Supervising Modeler, Production Designer, and
                Cinematics Director/Producer.
              </li>
            </ul>
          </div>

          <div className="resp_duty">
            <h4>Qualifications</h4>
            <ul>
              <li>
                Create models as well as sculpt (sets, props, characters, etc.),
                following the creative direction of the designated supervisor.
              </li>
              <li>
                Follow leads and supervisors' direction, ensuring that the
                models created are precise and accurate.
              </li>
              <li>
                Complete assigned modeling tasks in a timely manner and ensure
                all working files are efficiently organized at all times.
              </li>
              <li>
                Fully comprehend the requirements on the designs, thereby
                creating models true to their designs, whether organic or
                mechanical in nature.
              </li>
              <li>
                Address feedback and modify models by following the creative
                direction of the Supervising Modeler, Production Designer, and
                Cinematics Director/Producer.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HorizontalTabs;
