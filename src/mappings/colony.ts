import { BigInt, log } from '@graphprotocol/graph-ts'

import {
  IColony,
  ColonyInitialised,
  ColonyBootstrapped,
  ColonyUpgraded,
  ColonyRoleSet,
  ColonyFundsMovedBetweenFundingPots,
  ColonyFundsClaimed,
  RewardPayoutCycleStarted,
  RewardPayoutCycleEnded,
  RewardPayoutClaimed,
  ColonyRewardInverseSet,
  PaymentAdded,
  TaskAdded,
  TaskBriefSet,
  TaskDueDateSet,
  TaskDomainSet,
  TaskSkillSet,
  TaskRoleUserSet,
  TaskPayoutSet,
  TaskDeliverableSubmitted,
  TaskCompleted,
  TaskWorkRatingRevealed,
  TaskFinalized,
  PayoutClaimed,
  TaskCanceled,
  DomainAdded,
  FundingPotAdded,
  RegisterColonyLabelCall,
} from '../../generated/templates/Colony/IColony'
import { IColonyNetwork } from '../../generated/ColonyNetwork/IColonyNetwork'

import { Colony, ColonyRoles, Domain, Task, TaskPayout } from '../../generated/schema'

export function handleColonyInitialised(event: ColonyInitialised): void {}

export function handleColonyBootstrapped(event: ColonyBootstrapped): void {}

export function handleColonyUpgraded(event: ColonyUpgraded): void {}

export function handleColonyRoleSet(event: ColonyRoleSet): void {
  let roles = ColonyRoles.load(event.address.toHex() + '_' + event.params.domainId.toString() + '_' + event.params.user.toHex())
  if (!roles) {
    roles = new ColonyRoles(event.address.toHex() + '_' + event.params.domainId.toString() + '_' + event.params.user.toHex())
    roles.user = event.params.user.toHex()
    roles.domain = event.address.toHex() + '_' + event.params.domainId.toString()
  }

  switch (event.params.role) {
    // TODO: support the other roles

    case 6:
      roles.administration = event.params.setTo
      break;

    default:
      break;
  }
  roles.timestamp = event.block.timestamp
  roles.save()
}

export function handleColonyFundsMovedBetweenFundingPots(
  event: ColonyFundsMovedBetweenFundingPots
): void {}

export function handleColonyFundsClaimed(event: ColonyFundsClaimed): void {}

export function handleRewardPayoutCycleStarted(
  event: RewardPayoutCycleStarted
): void {}

export function handleRewardPayoutCycleEnded(
  event: RewardPayoutCycleEnded
): void {}

export function handleRewardPayoutClaimed(event: RewardPayoutClaimed): void {}

export function handleColonyRewardInverseSet(
  event: ColonyRewardInverseSet
): void {}

export function handlePaymentAdded(event: PaymentAdded): void {}

export function handleTaskAdded(event: TaskAdded): void {
  let task = new Task(event.params.taskId.toString())
  task.taskId = event.params.taskId
  task.colonyAddress = event.address
  task.status = 'created'
  task.timestamp = event.block.timestamp
  task.save()  
}

export function handleTaskBriefSet(event: TaskBriefSet): void {}

export function handleTaskDueDateSet(event: TaskDueDateSet): void {}

export function handleTaskDomainSet(event: TaskDomainSet): void {}

export function handleTaskSkillSet(event: TaskSkillSet): void {}

export function handleTaskRoleUserSet(event: TaskRoleUserSet): void {}

export function handleTaskPayoutSet(event: TaskPayoutSet): void {
  let taskPayout = new TaskPayout(event.params.taskId.toString() + '_' + event.address.toHex())
  taskPayout.taskId = event.params.taskId
  taskPayout.colonyAddress = event.address
  taskPayout.role = event.params.role
  taskPayout.token = event.params.token
  taskPayout.amount = event.params.amount
  taskPayout.timestamp = event.block.timestamp
  taskPayout.save()
}

export function handleTaskDeliverableSubmitted(
  event: TaskDeliverableSubmitted
): void {}

export function handleTaskCompleted(event: TaskCompleted): void {}

export function handleTaskWorkRatingRevealed(
  event: TaskWorkRatingRevealed
): void {}

export function handleTaskFinalized(event: TaskFinalized): void {
  let task = new Task(event.params.taskId.toString())
  task.taskId = event.params.taskId
  task.colonyAddress = event.address
  task.status = 'finalized'
  task.timestamp = event.block.timestamp
  task.save()
}

export function handlePayoutClaimed(event: PayoutClaimed): void {}

export function handleTaskCanceled(event: TaskCanceled): void {}

export function handleDomainAdded(event: DomainAdded): void {
  let domain = new Domain(event.address.toHex() + '_' + event.params.domainId.toString())
  domain.index = event.params.domainId
  domain.parent = event.address.toHex() + '_1'
  domain.colonyAddress = event.address
  domain.timestamp = event.block.timestamp
  domain.save()
}

export function handleFundingPotAdded(event: FundingPotAdded): void {}

// TODO: reinstate this when it can handle upgradable contracts
// export function handleRegisterColonyLabel(call: RegisterColonyLabelCall): void {
//   let colony = Colony.load(call.to.toHex())
  
//   if (colony) {
//     colony.ensName = call.inputs.colonyName
//     colony.orbitAddress = call.inputs.orbitdb
//     colony.save()
//   }
// }
