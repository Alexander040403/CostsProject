import { CostsService } from './costs.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
export declare class CostsController {
    private readonly costsService;
    private readonly authService;
    constructor(costsService: CostsService, authService: AuthService);
    getAllCosts(req: any, res: any): Promise<any>;
    createCost(createCostDto: CreateCostDto, req: any): Promise<import("../schemas/costs.schema").Cost | null>;
    updateCost(updateCostDto: UpdateCostDto, id: string): Promise<import("../schemas/costs.schema").Cost | null>;
    deleteCost(id: string): Promise<void>;
}
