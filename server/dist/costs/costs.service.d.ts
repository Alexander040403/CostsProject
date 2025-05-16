import { Model } from 'mongoose';
import { Cost, CostsDocument } from 'src/schemas/costs.schema';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
export declare class CostsService {
    private costsModel;
    constructor(costsModel: Model<CostsDocument>);
    findAll(): Promise<Cost[]>;
    findOne(id: string): Promise<Cost | null>;
    create(createCostDto: CreateCostDto): Promise<Cost>;
    update(updateCostDto: UpdateCostDto, id: string): Promise<Cost | null>;
    delete(id: string): Promise<void>;
}
