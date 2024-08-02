const data = [
    {
        service: "Us⭐",
        features: {
          "User Interface": true,
          "Affordability": true,
          "Easy Scalability": true,
          "Hosting Servers": true
        },
      },  
    {
      service: "AWS",
      features: {
        "User Interface": false,
        "Affordability": true,
        "Easy Scalability": false,
        "Hosting Servers": true

      },
    },
    {
        service: "Azure",
        features: {
          "User Interface": false,
          "Affordability": true,
          "Easy Scalability": false,
          "Hosting Servers": true

        },
      },  
    {
      service: "Heroku",
      features: {
        "User Interface": true,
        "Affordability": false,
        "Easy Scalability": true,
        "Hosting Servers": true

      },
    },
    {
      service: "Vercel",
      features: {
        "User Interface": true,
        "Affordability": false,
        "Easy Scalability": true,
        "Server Hosting": false

      },
    },
  ];
  
  const ComparisionTable = () => {
    const featureNames = Object.keys(data[0].features);
  
    return (
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 font-semibold">Feature</th>
            {data.map((serviceData) => (
              <th key={serviceData.service} className="px-4 py-2 font-semibold">
                {serviceData.service}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureNames.map((feature) => (
            <tr key={feature}>
              <td className="px-4 py-2">{feature}</td>
              {data.map((serviceData) => (
                <td key={serviceData.service} className="px-4 py-2">
                  {serviceData.features[feature] ? (
                    <CheckIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <CrossIcon className="w-5 h-5 text-red-500" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

export default ComparisionTable;


// function CheckIcon(props) {
//     return (
//       <svg
//         {...props}
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M20 6 9 17l-5-5" />
//       </svg>
//     )
//   }
  
  
//   function CrossIcon(props) {
//     return (
//       <svg
//         {...props}
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
//       </svg>
//     )
//   }
  



function CheckIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }
  
  function CrossIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  }
  
  
  function MountainIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    )
  }
  
  
  function XIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    )
  }
  