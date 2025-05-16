import { useCallback, useEffect, useMemo, useState } from "react"
import { Header } from "./Header/Header"
import { Spinner } from "../Spinner/Spinner";
import { getAuthDataFromLS } from "../../utils/auth";
import { $costs, setCosts } from "../../context";
import { useUnit } from "effector-react";
import { getCostsFx } from "../../api/costsClient";
import { CostsList } from "./CostsList/CostsList";
import { useNavigate } from 'react-router-dom';
import { CostsChart } from "../CostsCharts/CostsChart";

export const CostsPage = () => {
  const [spinner, setSpinner] = useState(false);
  const store = useUnit($costs);
  const navigate = useNavigate();

  const handleGetCosts = useCallback(async () => {
    setSpinner(true);
    try {
      const authData = getAuthDataFromLS();
      if (!authData?.access_token) {
        navigate('/login');
        return;
      }
  
      const costs = await getCostsFx({
        url: '/cost',
        token: authData.access_token
      });
      
      setCosts(costs || []);
    } catch (error) {
      console.error('Error fetching costs:', error);
      setCosts([]);
    } finally {
      setSpinner(false);
    }
  }, [navigate]);

  useEffect(() => {
    handleGetCosts();
  }, [handleGetCosts]);

    return (
        <div className="container">
        <CostsChart costs={store} />
            <h2 style={{ textAlign: 'center', marginBottom: 30, marginTop: 30 }}>Учет моих расходов</h2>
            {useMemo(() => <Header costs={store} />, [store])}
            <div style={{ position: 'relative' }}>
                {spinner && <Spinner top={0} left={0} />}
                {useMemo(() => <CostsList costs={store} />, [store])}
                {(!spinner && !store.length) && <h2>Список расходов пуст</h2>}
            </div>
        </div>
    )
}


