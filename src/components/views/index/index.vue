<template>
<div class="test">
  <el-card class="educationExperienceTable">
    <span class="cardHeader">教育经历</span>

    <el-table :data="educationExperience"
              stripe
              border>
      <el-table-column label="毕业时间">
        <template slot-scope="scope">
          <div class="educationExperienceDiv">
            <el-date-picker v-model="scope.row.graduationTime"
                            placeholder=""
                            type="date"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="毕业院校">
        <template slot-scope="scope">
          <div class="educationExperienceDiv">
            <el-input v-model="scope.row.graduationSchool"
                      placeholder="">
            </el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="专业">
        <template slot-scope="scope">
          <div class="educationExperienceDiv">
            <el-input v-model="scope.row.major"
                      placeholder="">
            </el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="学历">
        <template slot-scope="scope">
          <div class="educationExperienceDiv">
            <el-select v-model="scope.row.degree"
                        placeholder=""
                        clearable>
              <el-option v-for="(item, index) in degreeList"
                          :key="index"
                          :label="item.label"
                          :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="学历性质">
        <template slot-scope="scope">
          <div class="educationExperienceDiv">
            <el-select v-model="scope.row.degreeNature"
                        placeholder=""
                        clearable>
              <el-option v-for="(item, index) in degreeNatureList"
                          :key="index"
                          :label="item.label"
                          :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="学历编号">
        <template slot-scope="scope">
          <div class="educationExperienceDiv">
            <el-input v-model="scope.row.degreeNumber"
                      placeholder="">
            </el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                        width="136px">
        <template slot-scope="scope">
            <el-button type="success"
                        size="mini"
                        icon="el-icon-circle-plus-outline"
                        v-if="scope.row.show === 'true'"
                        plain
                        @click="pushNewEducation(scope.$index)">
            </el-button>
            <el-button type="danger"
                        size="mini"
                        icon="el-icon-delete"
                        plain
                        @click="deleteEducation(scope.$index)">
            </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      // 教育经历
      educationExperience: [{
        // 毕业时间
        graduationTime: '',
        // 毕业院校
        graduationSchool: '',
        // 专业
        major: '',
        // 学历
        degree: '',
        // 学历性质
        degreeNature: '',
        // 学历编号
        degreeNumber: '',
        // 是否显示新增按钮
        show: 'true',
      }],
      // 可选学历列表
      degreeList: [
        { label: '高中', value: '高中' },
        { label: '初中', value: '初中' },
        { label: '小学', value: '小学' },
      ],
      // 可选学历性质
      degreeNatureList: [
        { label: '小学升高中', value: '小学升高中' },
        { label: '初中升高中', value: '初中升高中' },
        { label: '高中升大学', value: '高中升大学' },
      ],
    };
  },

  methods: {
    // 添加新的教育经历
    pushNewEducation(index) {
      const list = this.educationExperience;
      list[index].show = 'false';
      list.push({
        // 毕业时间
        graduationTime: '',
        // 毕业院校
        graduationSchool: '',
        // 专业
        major: '',
        // 学历
        degree: '',
        // 学历性质
        degreeNature: '',
        // 学历编号
        degreeNumber: '',
        // 是否显示新增按钮
        show: 'true',
      });
    this.educationExperience = list;
    },
    // 删除教育经历
    deleteEducation(index) {
      const list = this.educationExperience;
      if (index === 0 && list.length === 1) {
        list.splice(index, 1);
        list.push({
          // 毕业时间
          graduationTime: '',
          // 毕业院校
          graduationSchool: '',
          // 专业
          major: '',
          // 学历
          degree: '',
          // 学历性质
          degreeNature: '',
          // 学历编号
          degreeNumber: '',
          // 是否显示新增按钮
          show: 'true',
        });
      } else {
        list.splice(index, 1);
      }
      if (index === list.length) {
        list[index - 1].show = 'true'
      }
      //list = this.educationExperience;
    }
  }
}
</script>
<style>

</style>