import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Box,
  Grid,
  List,
  Stack,
  Button,
  Typography,
  ListItemText,
  ListItemButton,
} from "@mui/material";

import MainCard from "@/components/MainCard";
import OrdersTable from "@/components/OrdersTable";
import IncomeAreaChart from "@/components/IncomeAreaChart";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import ReportAreaChart from "@/components/ReportAreaChart";
// import SalesColumnChart from "@/components/SalesColumnChart";
import AnalyticEcommerce from "@/components/AnalyticEcommerce";

import useAppSelector from "../hooks/useSelector";

const Profile = () => {
  const { t } = useTranslation();
  const [slot, setSlot] = useState("week");
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return <Navigate to={"/"} />;

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">{t("Profile")}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title={t("Total Page Views")}
          count="4,42,236"
          percentage={59.3}
          extra="35,000"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title={t("Total Users")}
          count="78,250"
          percentage={70.5}
          extra="8,900"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title={t("Total Order")}
          count="18,800"
          percentage={27.4}
          isLoss
          color="warning"
          extra="1,943"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title={t("Total Sales")}
          count="$35,078"
          percentage={27.4}
          isLoss
          color="warning"
          extra="$20,395"
        />
      </Grid>

      <Grid
        item
        md={8}
        sx={{ display: { sm: "none", md: "block", lg: "none" } }}
      />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">{t("Unique Visitor")}</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="small"
                onClick={() => setSlot("month")}
                color={slot === "month" ? "primary" : "secondary"}
                variant={slot === "month" ? "outlined" : "text"}
              >
                {t("Month")}
              </Button>
              <Button
                size="small"
                onClick={() => setSlot("week")}
                color={slot === "week" ? "primary" : "secondary"}
                variant={slot === "week" ? "outlined" : "text"}
              >
                {t("Week")}
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <IncomeAreaChart slot={slot} />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">{t("Income Overview")}</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                {t("This Week Statistics")}
              </Typography>
              <Typography variant="h3">$7,650</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">{t("Recent Orders")}</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">{t("Analytics Report")}</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, "& .MuiListItemButton-root": { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText primary="Company Finance Growth" />
              <Typography variant="h5">+45.14%</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Company Expenses Ratio" />
              <Typography variant="h5">0.58%</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Business Risk Cases" />
              <Typography variant="h5">Low</Typography>
            </ListItemButton>
          </List>
          <ReportAreaChart />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Profile;
