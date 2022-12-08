import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import { useTranslation } from "react-i18next";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

import Header from "./Components/Header";
import client from "./apis/client";
import { ViewCustomerModal } from "./Components/ViewCustomerModal";
import { useFetchAPI } from "./hooks/useFetchAPI";
import states_map from "./utils/states_map";
import "./App.css";
import { parseAxiosError } from "./utils/axios";

function App() {
  const [errorText, setErrorText] = useState(null);
  const { t } = useTranslation();

  const { data, error } = useFetchAPI(
    {
      method: "GET",
      url: "/customers",
    }
  );

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    if (data) {
      const updateClient = async () => {
        try {
          await client.post("/customer", {
            timestamp: new Date().toISOString(),
            firstcustomer: btoa(JSON.stringify(data[0])),
          });
        } catch (e) {
          setErrorText(parseAxiosError(e, t));
        }
      };

      updateClient();
      // call post
    }
  }, [data]);

  useEffect(() => {
    if (errorText) {
      const timer = setTimeout(() => {
        setErrorText(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorText]);

  useEffect(() => {
    if (error) {
      setErrorText(error);
    }
  }, [error]);

  return (
    <div className="App">
      <Header />

      <div>
        <Container className="py-4">
          {errorText && <Alert variant={"danger"}>{errorText}</Alert>}
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>{t("tables.name")}</th>
                <th>{t("tables.short_location")}</th>
                <th>{t("tables.long_location")}</th>
              </tr>
            </thead>
            <tbody>
              {data && (
                <>
                  {data.map((customer) => (
                    <tr
                      className={
                        !customer.active ? "disabled table-active" : ""
                      }
                      onClick={
                        customer.active
                          ? () => {
                              setSelectedCustomer(customer);
                            }
                          : undefined
                      }
                      key={customer.id}
                    >
                      <td>{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.location}</td>
                      <td>{states_map[customer.location]}</td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </Table>
          <ViewCustomerModal
            customer={selectedCustomer}
            onClose={() => setSelectedCustomer(null)}
          />
        </Container>
      </div>
    </div>
  );
}

export default App;
