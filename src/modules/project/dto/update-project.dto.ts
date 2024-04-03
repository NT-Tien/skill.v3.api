import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { BaseDTO } from "src/common/base/dto.base";

export class UpdateProjectDto extends BaseDTO {

    @ApiProperty()
    @Expose()
    projectName: string

    @ApiProperty()
    @Expose()
    description: string

    @ApiProperty()
    @Expose()
    startDate: Date

    @ApiProperty()
    @Expose()
    endDate: Date

}