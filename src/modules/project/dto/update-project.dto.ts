import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { BaseDTO } from "src/common/base/dto.base";

export class UpdateProjectDto extends BaseDTO {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    projectName: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    startDate: Date

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    endDate: Date

}