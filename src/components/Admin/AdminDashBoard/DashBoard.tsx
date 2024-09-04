import { StyledBox, StyledContainer } from "./DashBoard.styles";
import { ChefTable } from "./ChefTable/ChefTable";
import { RestaurantTable } from "./RestaurantTable/RestaurantTable";
import { DishesTable } from "./DishesTable/DishesTable";

interface DashBoardProps {
  model: string;
}

export const DashBoard = ({ model }: DashBoardProps) => {
  return (
    <StyledBox>
      <StyledContainer>
        {model === "chef" && <ChefTable />}
        {model === "restaurant" && <RestaurantTable />}
        {model === "dish" && <DishesTable />}
      </StyledContainer>
    </StyledBox>
  );
};
