import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";
import { IsNotEmpty, IsPhoneNumber, IsString, ValidateIf } from "class-validator";
import { BaseDTO } from "src/common/base/dto.base";

export class UpdateProjectDto extends BaseDTO {

    @ApiProperty()
    @IsString()
    @ValidateIf((object, value) => value !== undefined)
    @Expose()
    projectName: string

    @ApiProperty()
    @IsString()
    @ValidateIf((object, value) => value !== undefined)
    @Expose()
    description: string

    @ApiProperty()
    @Transform(({ value }) => value ? new Date(value) : value)
    @Type(() => Date)
    @ValidateIf((object, value) => value !== undefined)
    @Expose()
    startDate: Date

    @ApiProperty()
    @Transform(({ value }) => value ? new Date(value) : value)
    @Type(() => Date)
    @ValidateIf((object, value) => value !== undefined)
    @Expose()
    endDate: Date

}